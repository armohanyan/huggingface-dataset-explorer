export interface IAlertMessage {
    severity: "success" | "info" | "warn" | "error" | "secondary" | "contrast"
    summary: string
    detail: string
    sticky: boolean
}
