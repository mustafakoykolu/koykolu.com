export const  formatMonthYear = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("tr-TR", { year: "numeric", month: "long" });
  };

  export const  formatYear = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("tr-TR", { year: "numeric"});
  };