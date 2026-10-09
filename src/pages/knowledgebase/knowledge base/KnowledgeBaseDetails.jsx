import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function KnowledgeBaseDetails() {
  const navigate = useNavigate();
  const { knowledgeBaseId } = useParams();

  useEffect(() => {
    if (!knowledgeBaseId) {
      navigate("/knowledge-base", {
        replace: true,
      });
      return;
    }

    navigate(
      `/knowledge-base/${knowledgeBaseId}/sources`,
      {
        replace: true,
      }
    );
  }, [knowledgeBaseId, navigate]);

  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="text-sm text-gray-500">
        Opening Knowledge Base...
      </div>
    </div>
  );
}