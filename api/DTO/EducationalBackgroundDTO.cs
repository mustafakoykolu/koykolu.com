namespace api.DTO
{
    public class EducationalBackgroundDTO
    {
        public int Id { get; set; }
        public string LogoPath { get; set; } = string.Empty;
        public string DepartmentName { get; set; } = string.Empty;
        public string SchoolName { get; set; } = string.Empty;
        public string EducationDegree { get; set; } = string.Empty;
        public DateTime BeginDate { get; set; }
        public DateTime? EndDate { get; set; }
    }
}
