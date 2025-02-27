import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Paperclip, X } from "lucide-react";

export default function FileUpload({ value = [], onChange }) {
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    
    // Validate file size and type
    const invalidFiles = files.filter(
      file => file.size > 5 * 1024 * 1024 || 
      !['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)
    );

    if (invalidFiles.length) {
      setError("Files must be images or PDFs under 5MB");
      return;
    }

    setError("");
    // Store file names (in real app, would upload to storage and store URLs)
    onChange([...value, ...files.map(f => f.name)]);
  };

  const removeFile = (fileName) => {
    onChange(value.filter(f => f !== fileName));
  };

  return (
    <div className="space-y-4">
      <Label htmlFor="file">Attachments (Optional)</Label>
      
      <div className="flex items-center gap-4">
        <Input
          type="file"
          id="file"
          className="hidden"
          multiple
          accept="image/*,.pdf"
          onChange={handleFileChange}
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => document.getElementById('file').click()}
        >
          <Paperclip className="mr-2 h-4 w-4" />
          Add Files
        </Button>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>

      {value.length > 0 && (
        <ul className="space-y-2">
          {value.map((fileName, i) => (
            <li key={i} className="flex items-center gap-2 text-sm">
              <Paperclip className="h-4 w-4" />
              <span>{fileName}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeFile(fileName)}
              >
                <X className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
