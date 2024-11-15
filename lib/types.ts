export interface User {
    login: string;
    avatar_url: string;
  }
  
export interface Label {
    name: string;
    color?: string;
    description?: string;
  }
  
export interface PR {
    id: number;
    number: number;
    title: string;
    repository: string;
    state: 'open' | 'draft' | 'closed';
    draft: boolean;
    approvalCount: number;
    url: {
      html_url: string;
    };
    user: User;
    labels: string[];
    created_at?: string;
    updated_at?: string;
    team: string;
  }
  
export interface Team {
    id: string;
    name: string;
  }
  
export interface PRReview {
    id: number;
    user: User;
    state: 'APPROVED' | 'CHANGES_REQUESTED' | 'COMMENTED' | 'DISMISSED';
    submitted_at: string;
    body?: string;
  }
  
export interface APIResponse<T> {
    items: T[];
    total_count: number;
    incomplete_results: boolean;
  }