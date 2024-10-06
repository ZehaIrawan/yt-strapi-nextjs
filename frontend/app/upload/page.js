import UploadComponent from "@/components/UploadComponent";

export default async function UploadPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">This is Upload Page</h1>
      <UploadComponent />
    </div>
  );
}
