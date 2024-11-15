import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Team } from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const BASE_URL = 'https://api.github.com';

export const TEAMS: Team[] = [
  { id: '@TFG-Labs/web', name: 'Web Team' },
  { id: '@TFG-Labs/mobile', name: 'Mobile Team' },
];

export const fetchOpenPRs = async (team: string = 'web') => {
  const query = `is:pr is:open org:${process.env.GITHUB_ORG} ${
    team === 'web' ? 'repo:@TFG-Labs/web' : `team:${process.env.GITHUB_ORG}/${team}`
  }`;
  
  const response = await fetch(`${BASE_URL}/search/issues?q=${encodeURIComponent(query)}`, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  });

  if (!response.ok) throw new Error('Failed to fetch PRs');
  return response.json();
};

export const fetchPRReviews = async (repo: string, prNumber: number) => {
  const response = await fetch(`${BASE_URL}/repos/${process.env.GITHUB_ORG}/${repo}/pulls/${prNumber}/reviews`, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  });

  if (!response.ok) throw new Error('Failed to fetch PR reviews');
  return response.json();
};