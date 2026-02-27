export const formatTimeSinceLastCommit = (dateString: string): string => {
  const lastCommitDate = new Date(dateString);
  const currentDate = new Date();
  const timeDiffMs = currentDate.getTime() - lastCommitDate.getTime();
  const timeDiffDays = Math.floor(timeDiffMs / (1000 * 60 * 60 * 24));

  if (timeDiffDays < 1) return "Today";
  if (timeDiffDays === 1) return "1 day ago";
  if (timeDiffDays < 30) return `${timeDiffDays} days ago`;
  if (timeDiffDays < 365) {
    const months = Math.floor(timeDiffDays / 30);
    return months === 1 ? "1 month ago" : `${months} months ago`;
  }

  const years = Math.floor(timeDiffDays / 365);
  return years === 1 ? "1 year ago" : `${years} years ago`;
};
