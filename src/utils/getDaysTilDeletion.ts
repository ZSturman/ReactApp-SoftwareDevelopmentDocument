export const daysTilDeletion = (date: number) => {
    const deleteDate = new Date(date + 30 * 24 * 60 * 60 * 1000);
    const currentDate = new Date();
    const timeDiff = deleteDate.getTime() - currentDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return daysDiff.toString();
  };