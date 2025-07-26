
export interface WorkExperienceModel{
    id: number;
    title: string;
    company: string;
    beginDate: string;
    endDate: string | null;
    description: string;
}
export interface WorkExperienceTechnologyModel {
    id: number;
    name: string;
}
export interface EducationBackgroundModel {
    id: number;
    logoPath:string;
    departmentName: string;
    schoolName: string;
    educationDegree: string;
    beginDate: string;
    endDate: string | null; 
}