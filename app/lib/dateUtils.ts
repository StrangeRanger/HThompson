export const formatTimeSinceLastCommit = (dateString: string): string => {
  const lastCommitDate: Date = new Date(dateString);
  const currentDate: Date = new Date();
  const timeDiffMs: number = currentDate.getTime() - lastCommitDate.getTime();
  const timeDiffDays: number = Math.floor(timeDiffMs / (1000 * 60 * 60 * 24));

  if (timeDiffDays < 1) {
    return "Today";
  } else if (timeDiffDays === 1) {
    return "1 day ago";
  } else if (timeDiffDays < 30) {
    return `${timeDiffDays} days ago`;
  } else if (timeDiffDays < 365) {
    const months: number = Math.floor(timeDiffDays / 30);
    return months === 1 ? "1 month ago" : `${months} months ago`;
  }

  const years: number = Math.floor(timeDiffDays / 365);
  return years === 1 ? "1 year ago" : `${years} years ago`;
};
