import { PR } from '../lib/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const PRCard = ({ pr }: { pr: PR }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-green-500/10 text-green-500';
      case 'draft':
        return 'bg-gray-500/10 text-gray-500';
      default:
        return 'bg-blue-500/10 text-blue-500';
    }
  };

  return (
    <Card className="transition-colors">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center space-x-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src={pr.user.avatar_url} alt={pr.user.login} />
            <AvatarFallback>{pr.user.login.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{pr.title}</h3>
            <p className="text-sm text-muted-foreground">
              by {pr.user.login} in {pr.repository}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className={getStatusColor(pr.state)}>
            {pr.state}
          </Badge>
          {pr.draft && <Badge variant="secondary">Draft</Badge>}
          {pr.labels.map((label: string) => (
            <Badge key={label} variant="outline">
              {label}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <p className="text-sm">Approvals: {pr.approvalCount}</p>
          <a
            href={pr.url.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            View PR →
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default PRCard;