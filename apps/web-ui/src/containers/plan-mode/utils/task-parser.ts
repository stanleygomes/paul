export const parseTaskFromResponse = (content: string) => {
  const jsonMatch =
    content.match(/```json\n([\s\S]*?)\n```/) ||
    content.match(/{[\s\S]*?"task"[\s\S]*?}/);
  if (jsonMatch) {
    try {
      const data = JSON.parse(jsonMatch[1] || jsonMatch[0]);
      return data.task || data;
    } catch (e) {
      console.error("Failed to parse task JSON:", e);
      return null;
    }
  }
  return null;
};
