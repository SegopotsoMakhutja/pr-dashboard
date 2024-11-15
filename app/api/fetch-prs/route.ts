import { NextResponse } from 'next/server';
import { fetchOpenPRs, fetchPRReviews } from '../../../lib/utils';

export async function GET() {
  try {
    const prs = await fetchOpenPRs();
    const filteredPRs = await Promise.all(
      prs.items.map(async (pr: { repository_url: string; number: number; id: number; title: string; draft: boolean; html_url: string; user: { login: string; avatar_url: string }; labels: { name: string }[] }) => {
        const repoName = pr.repository_url.split('/').pop();
        if (!repoName) {
          throw new Error('Repository name is undefined');
        }
        const reviews = await fetchPRReviews(repoName, pr.number);
        const approvals = reviews.filter((review: { state: string }) => review.state === 'APPROVED');
        
        return {
          id: pr.id,
          number: pr.number,
          title: pr.title,
          repository: repoName,
          state: pr.draft ? 'draft' : 'open',
          draft: pr.draft,
          approvalCount: approvals.length,
          url: {
            html_url: pr.html_url
          },
          user: {
            login: pr.user.login,
            avatar_url: pr.user.avatar_url
          },
          labels: pr.labels.map((label: { name: string }) => label.name)
        };
      })
    );

    return NextResponse.json(filteredPRs.filter((pr) => pr.approvalCount < 2));
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}