import { useState } from 'react';
import PRCard from './PRCard';
import { PR } from '../lib/types';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const ITEMS_PER_PAGE = 10;

const PRList = ({ prs }: { prs: PR[] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showDependabot, setShowDependabot] = useState(true);

  const filteredPRs = prs.filter(pr => 
    showDependabot || pr.user.login !== 'dependabot[bot]'
  );

  const totalPages = Math.ceil(filteredPRs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visiblePRs = filteredPRs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Switch
            id="dependabot"
            checked={showDependabot}
            onCheckedChange={setShowDependabot}
          />
          <Label htmlFor="dependabot">Show Dependabot PRs</Label>
        </div>
        <div className="text-sm text-muted-foreground">
          Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredPRs.length)} of {filteredPRs.length}
        </div>
      </div>

      <div className="space-y-4">
        {visiblePRs.map((pr) => (
          <PRCard key={pr.id} pr={pr} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center space-x-2 mt-6">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <div className="flex items-center space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i + 1}
                variant={currentPage === i + 1 ? "default" : "outline"}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
          </div>
          <Button
            variant="outline"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default PRList;