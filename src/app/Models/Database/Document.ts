export interface Document{
    id: number;
    name: string;
    currentVersion: DocumentVersion;
    versions: DocumentVersion[];
}

export interface DocumentVersion{
    id: number;
    version: string;
    path: string;
}