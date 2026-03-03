import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import ScoreCircle from "./ScoreCircle";
import { usePuterStore } from "~/lib/puter";

const ResumeCard = ({ resume }: { resume: Resume }) => {
  const [resumeUrl, setresumeUrl] = useState("");
  const { fs } = usePuterStore();

  useEffect(() => {
    const loadResume = async () => {
      const blob = await fs.read(resume.imagePath);
      if (!blob) return;
      let url = URL.createObjectURL(blob);
      setresumeUrl(url);
    };
    loadResume();
  }, [resume.imagePath]);
  return (
    <Link
      to={`/resume/${resume.id}`}
      className="resume-card animate-in fade-in duration-1000"
    >
      <div className="resume-card-header">
        <div className="flex flex-col gap-2">
          {resume.companyName && (
            <h2 className="text-black font-bold wrap-break-words">
              {resume.companyName}
            </h2>
          )}
          {resume.jobTitle && (
            <h3 className="text-lg text-gray-500">{resume.jobTitle}</h3>
          )}
          {!resume.companyName && !resume.jobTitle && (
            <h2 className="text-black! font-bold">Resume</h2>
          )}
        </div>
        <div className="shrink-0">
          <ScoreCircle score={resume.feedback.overallScore} />
        </div>
      </div>
      {resumeUrl && (
        <div className="gradient-border animate-in fade-in duration-1000">
          <div className="w-full h-full ">
            <img
              src={resumeUrl}
              alt="resume"
              className="w-full h-87.5 max-sm:h-50 object-cover object-top"
            />
          </div>
        </div>
      )}
    </Link>
  );
};

export default ResumeCard;
