import { MainLayout } from "../../components/main-layout";
import { KnowledgebaseForm } from "../../components/knowledgebase-form";

export default function KnowledgebasePage() {
  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            Knowledgebase
          </h1>
          <p className="text-muted-foreground">
            Add documents and data to your Pinecone vector database for AI retrieval.
          </p>
        </div>
        <KnowledgebaseForm />
      </div>
    </MainLayout>
  );
}
