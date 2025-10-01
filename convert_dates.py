
#!/usr/bin/env python3
"""
Date Field Converter Script

This script converts JSON data with date fields containing spaces to use underscores.
Example: "Jan 2025" -> "Jan_2025"

Usage:
    python convert_dates.py input.json output.json
    python convert_dates.py input.json  # (outputs to input_converted.json)
"""

import json
import sys
import re
from pathlib import Path


def convert_date_fields(data):
    """
    Convert date fields with spaces to use underscores.
    Handles both single objects and arrays of objects.
    """
    if isinstance(data, list):
        return [convert_date_fields(item) for item in data]
    elif isinstance(data, dict):
        converted = {}
        for key, value in data.items():
            # Convert keys that look like date fields (Month YYYY format)
            if re.match(r'^[A-Za-z]{3}\s+\d{4}$', key):
                new_key = key.replace(' ', '_')
                converted[new_key] = value
            else:
                converted[key] = value
        return converted
    else:
        return data


def main():
    # Get input and output file paths
    if len(sys.argv) < 2:
        print("Usage: python convert_dates.py input.json [output.json]")
        sys.exit(1)
    
    input_file = sys.argv[1]
    output_file = sys.argv[2] if len(sys.argv) > 2 else None
    
    # Generate output filename if not provided
    if not output_file:
        input_path = Path(input_file)
        output_file = input_path.parent / f"{input_path.stem}_converted{input_path.suffix}"
    
    try:
        # Read input JSON
        print(f"Reading {input_file}...")
        with open(input_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # Convert date fields
        print("Converting date fields...")
        converted_data = convert_date_fields(data)
        
        # Write output JSON
        print(f"Writing to {output_file}...")
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(converted_data, f, indent=2, ensure_ascii=False)
        
        print(f"✅ Conversion complete! Output saved to: {output_file}")
        
        # Show sample of converted data
        if isinstance(converted_data, list) and len(converted_data) > 0:
            print("\n📋 Sample of converted data:")
            sample = converted_data[0]
            date_fields = {k: v for k, v in sample.items() if '_' in k and re.match(r'^[A-Za-z]{3}_\d{4}$', k)}
            if date_fields:
                for key, value in list(date_fields.items())[:3]:  # Show first 3 date fields
                    print(f"  {key}: {value}")
                if len(date_fields) > 3:
                    print(f"  ... and {len(date_fields) - 3} more date fields")
        
    except FileNotFoundError:
        print(f"❌ Error: File '{input_file}' not found")
        sys.exit(1)
    except json.JSONDecodeError as e:
        print(f"❌ Error: Invalid JSON in '{input_file}': {e}")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
