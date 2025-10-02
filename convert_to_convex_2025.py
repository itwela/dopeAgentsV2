#!/usr/bin/env python3
"""
Convert raw account/monthly send data into Convex dopeActiveAccounts format.

Input: JSON file (array or object containing an array) with fields like:
  - account_name | Account | Account Name
  - account_id | Account ID | id
  - hubspot_id | HubSpot ID
  - industry | Industry
  - monthly fields like "Jan 2025" or "Jan_2025" (string or number)

Output: JSON array where each object matches the new Convex schema shape:
  {
    "account_name": string,
    "account_id"?: string,
    "hubspot_id"?: string,
    "industry"?: string,
    "year_2025"?: { "Jan"?: string, ..., "Dec"?: string }
  }

Usage:
  python convert_to_convex_2025.py --input input.json --output output.json
"""

import argparse
import json
import re
import sys
from typing import Any, Dict, List, Optional


MONTHS = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
]


def normalize_key(key: str) -> str:
    # Lowercase and collapse non-alphanumerics to single underscore for matching
    k = re.sub(r"[^a-z0-9]+", "_", key.strip().lower())
    k = re.sub(r"_+", "_", k)
    return k.strip("_")


def find_first(obj: Dict[str, Any], candidates: List[str]) -> Optional[Any]:
    # Try exact, case-insensitive, and normalized matches
    obj_keys = list(obj.keys())
    norm_map = {normalize_key(k): k for k in obj_keys}
    lower_map = {k.lower(): k for k in obj_keys}

    for c in candidates:
        # exact
        if c in obj:
            return obj[c]
        # lower
        if c.lower() in lower_map:
            return obj[lower_map[c.lower()]]
        # normalized
        nc = normalize_key(c)
        if nc in norm_map:
            return obj[norm_map[nc]]
    return None


def to_string_value(value: Any) -> Optional[str]:
    if value is None:
        return None
    # If number, stringify without losing commas if the source had them
    if isinstance(value, (int, float)):
        # Strip decimals for whole numbers
        if isinstance(value, float) and value.is_integer():
            return str(int(value))
        return str(value)
    # Strings: trim and pass through
    if isinstance(value, str):
        s = value.strip()
        return s if s != "" else None
    # Fallback to JSON string
    try:
        return json.dumps(value, ensure_ascii=False)
    except Exception:
        return str(value)


def extract_2025(obj: Dict[str, Any]) -> Optional[Dict[str, str]]:
    months_out: Dict[str, str] = {}
    # Support keys like "Jan_2025", "Jan 2025", "2025 Jan", "2025_Jan"
    for m in MONTHS:
        candidate_keys = [
            f"{m}_2025", f"{m} 2025", f"2025 {m}", f"2025_{m}",
            # common variants
            f"{m}-2025", f"2025-{m}", f"{m}/2025", f"2025/{m}",
        ]
        raw = find_first(obj, candidate_keys)
        sval = to_string_value(raw)
        if sval is not None:
            months_out[m] = sval

    return months_out or None


def convert_record(rec: Dict[str, Any]) -> Dict[str, Any]:
    out: Dict[str, Any] = {}

    # Map core identifiers with flexible key matching
    out_name = find_first(rec, ["account_name", "Account Name", "Account", "Customer", "Name"])  # required
    if not out_name or str(out_name).strip() == "":
        # Try a last resort by checking for any key that contains 'account' and 'name'
        for k, v in rec.items():
            if "account" in k.lower() and "name" in k.lower():
                out_name = v
                break
    if not out_name:
        raise ValueError("Missing account_name in record")
    out["account_name"] = str(out_name).strip()

    out_account_id = find_first(rec, ["account_id", "Account ID", "id", "accountId"])
    if out_account_id is not None and str(out_account_id).strip() != "":
        out["account_id"] = str(out_account_id).strip()

    out_hubspot_id = find_first(rec, ["hubspot_id", "HubSpot ID", "hubspotId"]) 
    if out_hubspot_id is not None and str(out_hubspot_id).strip() != "":
        out["hubspot_id"] = str(out_hubspot_id).strip()

    out_industry = find_first(rec, ["industry", "Industry"]) 
    if out_industry is not None and str(out_industry).strip() != "":
        out["industry"] = str(out_industry).strip()

    yr2025 = extract_2025(rec)
    if yr2025:
        out["year_2025"] = yr2025

    return out


def load_input(path: str) -> List[Dict[str, Any]]:
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)
    if isinstance(data, list):
        return data
    # If the JSON is an object, try to pull the first array-like field
    if isinstance(data, dict):
        for k, v in data.items():
            if isinstance(v, list):
                return v
    raise ValueError("Input JSON must be an array or an object containing an array of records")


def main() -> int:
    parser = argparse.ArgumentParser(description="Convert raw monthly data to Convex dopeActiveAccounts 2025 shape")
    parser.add_argument("--input", required=True, help="Path to input JSON file")
    parser.add_argument("--output", required=True, help="Path to output JSON file")
    args = parser.parse_args()

    rows = load_input(args.input)
    output_rows: List[Dict[str, Any]] = []

    errors = 0
    for i, rec in enumerate(rows):
        if not isinstance(rec, dict):
            # Skip non-dict rows
            continue
        try:
            out = convert_record(rec)
            output_rows.append(out)
        except Exception as e:
            errors += 1
            # Keep going; print a brief error message
            sys.stderr.write(f"[warn] row {i}: {e}\n")

    with open(args.output, "w", encoding="utf-8") as f:
        json.dump(output_rows, f, ensure_ascii=False, indent=2)

    print(f"Converted {len(output_rows)} records. Skipped {errors} rows with errors.")
    print(f"Wrote: {args.output}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())


