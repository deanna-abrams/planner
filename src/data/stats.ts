import { Priority, Issue } from './types'
import { priorityFromLabels } from './priorities';

// Count the # of each type of issue priority here
export const priorityStatsFromIssues = (issues: Issue[]) => {
  const orderedPriorityStats = { "🔥": 0, "⭐️": 0, "🙏": 0, "🤷🏻‍♀️": 0  };
  const statsMap = issues.reduce((stats: any, issue: any) => {
    const labelNames = issue.labels.nodes.map(node => node.title);
    const priority = priorityFromLabels(labelNames);
    if ( priority ) {
      stats[priority.icon] = (stats[priority.icon] || 0) + (parseInt(issue.humanTimeEstimate) || 0);
    }
    return stats;
  }, orderedPriorityStats);

  // Turn our map into an array and remove all the zero hour entries
  const statsArray = Object.keys(statsMap).map((icon: string) => { return { icon: icon, value: `${statsMap[icon]}h` } });
  return statsArray.filter(stat => stat.value !== '0h');
}

// Count the # of total hours 
export const hourlyStatsFromIssues = (issues: Issue[], icons: string[]) => {
  const orderedStats = icons.reduce((stats: any, icon: string) => {
    stats[icon] = 0;
    return stats;
  }, {});

  // Add each issue to the stats map
  const statsMap = issues.reduce((stats: any, issue: any) => {
    const labelNames = issue.labels.nodes.map(node => node.title);
    icons.filter(icon => labelNames.filter(label => label.indexOf(icon) !== -1).length > 0).forEach(icon => {
      
      // We found this icon was included in the label name, so let's add it to the stats
      stats[icon] = (stats[icon] || 0) + (parseInt(issue.humanTimeEstimate) || 0);
    });
    return stats;
  }, orderedStats);

  // Turn our map into an array and remove all the zero hour entries
  const statsArray = Object.keys(statsMap).map((icon: string) => { return { icon: icon, value: `${statsMap[icon]}h` } });
  return statsArray.filter(stat => stat.value !== `0h`);
}

// Count the # of total issues 
export const countStatsFromIssues = (issues: Issue[], icons: string[]) => {
  const orderedStats = icons.reduce((stats: any, icon: string) => {
    stats[icon] = 0;
    return stats;
  }, {});

  // Add each issue to the stats map
  const statsMap = issues.reduce((stats: any, issue: any) => {
    const labelNames = issue.labels.nodes.map(node => node.title);
    icons.filter(icon => labelNames.filter(label => label.indexOf(icon) !== -1).length > 0).forEach(icon => {
      
      // We found this icon was included in the label name, so let's add it to the stats
      stats[icon] = (stats[icon] || 0) + 1;
    });
    return stats;
  }, orderedStats);

  // Turn our map into an array and remove all the zero hour entries
  const statsArray = Object.keys(statsMap).map((icon: string) => { return { icon: icon, value: `${statsMap[icon]}` } });
  return statsArray.filter(stat => stat.value !== `0`);
}
