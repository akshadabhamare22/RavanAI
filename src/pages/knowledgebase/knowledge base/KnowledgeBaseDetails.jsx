// import React, { useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// export default function KnowledgeBaseDetails() {
//   const navigate = useNavigate();
//   const { knowledgeBaseId } = useParams();

//   useEffect(() => {
//     if (!knowledgeBaseId) {
//       navigate("/knowledge-base", {
//         replace: true,
//       });
//       return;
//     }

//     navigate(
//       `/knowledge-base/${knowledgeBaseId}/sources`,
//       {
//         replace: true,
//       }
//     );
//   }, [knowledgeBaseId, navigate]);

//   return (
//     <div className="flex min-h-[400px] items-center justify-center">
//       <div className="text-sm text-gray-500">
//         Opening Knowledge Base...
//       </div>
//     </div>
//   );
// }





import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function KnowledgeBaseDetails() {
  const navigate = useNavigate();
  const { knowledgeBaseId } = useParams();

  const [isOpening, setIsOpening] = useState(true);
  const hasNavigated = useRef(false);

  useEffect(() => {
    if (hasNavigated.current) return;

    if (!knowledgeBaseId) {
      hasNavigated.current = true;
      navigate("/knowledge-base", {
        replace: true,
      });
      return;
    }

    hasNavigated.current = true;
    setIsOpening(true);

    navigate(`/knowledge-base/${knowledgeBaseId}/sources`, {
      replace: true,
    });
  }, [knowledgeBaseId, navigate]);

  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        {isOpening && (
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
        )}

        <p className="text-sm text-gray-500">
          Opening Knowledge Base...
        </p>
      </div>
    </div>
  );
}

