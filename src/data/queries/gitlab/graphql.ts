import { gql } from '@apollo/client';

export const EPIC_ONLY_FRAGMENT = gql`
  fragment epicOnlyResult on Epic {
    id,
    iid,
    title,
    state,
    startDate,
    dueDate,
    webUrl,
    labels {
      nodes {
        id,
        title
      }
    },
    createdAt,
    updatedAt
  }
`;

export const ISSUE_ONLY_FRAGMENT = gql`
  fragment issueOnlyResult on Issue {
      id,
      iid,
      projectId,
      title,
      state,
      webUrl,
      webPath,
      dueDate,
      humanTimeEstimate,
      labels {
          nodes {
            id,
            title
          }
      },
      milestone {
        id,
        title
      },
      assignees {
        nodes {
          username
        }
      },
      author {
        name,
        username
      },
      createdAt,
      updatedAt
  }
`;

export const ISSUE_WITH_EPIC_FRAGMENT = gql`
  fragment issueWithEpicResult on Issue {
      id,
      iid,
      projectId,
      title,
      state,
      webUrl,
      webPath,
      dueDate,
      humanTimeEstimate,
      milestone {
        id,
        title
      },
      assignees {
        nodes {
          username
        }
      },
      labels {
          nodes {
            id,
            title
          }
      },
      epic {
        ...epicOnlyResult
      },
      author {
        name,
        username
      },
      createdAt,
      updatedAt
  }
  ${EPIC_ONLY_FRAGMENT}
`;

export const EPIC_WITH_ISSUES_FRAGMENT = gql`
  fragment epicWithIssuesResult on Epic {
    id,
    iid,
    title,
    state,
    startDate,
    dueDate,
    webUrl,
    labels {
      nodes {
        id,
        title
      }
    },
    issues {
      ...issueOnlyResult
    },
    createdAt,
    updatedAt
  }
  ${ISSUE_ONLY_FRAGMENT}
`;

export const ALL_ISSUES = gql`
  query GetAllUserIssues($username: String!, $milestones: [String], $labels: [String], $fullPath: ID!) {
    group(fullPath: $fullPath) {
      name,
      issues (assigneeUsernames: [$username], 
              milestoneTitle: $milestones,
              labelName: $labels,
              sort: CREATED_ASC ) {
        nodes {
          ...issueWithEpicResult
        }
      }
    }
  }
  ${ISSUE_WITH_EPIC_FRAGMENT}
`;


export const ALL_PROJECT_ISSUES = gql`
  query GetAllUserProjectIssues($username: String!, $milestones: [String], $labels: [String], $fullPath: ID!) {
    project(fullPath: $fullPath) {
      name,
      issues (assigneeUsernames: [$username], 
              milestoneTitle: $milestones,
              labelName: $labels,
              sort: CREATED_ASC ) {
        nodes {
          ...issueWithEpicResult
        }
      }
    }
  }
  ${ISSUE_WITH_EPIC_FRAGMENT}
`;

export const OPEN_ISSUES_NO_MILESTONE = gql`
  query GetOpenUserIssuesNoMilestone($username: String!, $labels: [String], $fullPath: ID!) {
    project(fullPath: $fullPath) {
      name,
      issues (assigneeUsernames: [$username], 
              milestoneWildcardId: NONE,
              labelName: $labels,
              state: opened,
              sort: CREATED_ASC ) {
        nodes {
          ...issueWithEpicResult
        }
      }
    }
  }
  ${ISSUE_WITH_EPIC_FRAGMENT}
`;

export const ALL_BUG_ISSUES = gql`
  query GetAllBugs($milestones: [String], $labels: [String], $fullPath: ID!) {
    project(fullPath: $fullPath) {
      name,
      issues (milestoneTitle: $milestones,
              labelName: $labels,
              sort: CREATED_ASC ) {
        nodes {
          ...issueWithEpicResult
        }
      }
    }
  }
  ${ISSUE_WITH_EPIC_FRAGMENT}
`;

export const ALL_FIXED_BUG_ISSUES = gql`
  query GetAllFixedBugs($milestones: [String], $labels: [String], $fullPath: ID!) {
    project(fullPath: $fullPath) {
      name,
      issues (milestoneTitle: $milestones,
              labelName: $labels,
              state: closed,
              sort: CREATED_ASC ) {
        nodes {
          ...issueWithEpicResult
        }
      }
    }
  }
  ${ISSUE_WITH_EPIC_FRAGMENT}
`;

export const ALL_OPEN_BUG_ISSUES = gql`
  query GetAllOpenBugs($milestones: [String], $labels: [String], $fullPath: ID!) {
    project(fullPath: $fullPath) {
      name,
      issues (milestoneTitle: $milestones,
              labelName: $labels,
              state: opened,
              sort: CREATED_ASC ) {
        nodes {
          ...issueWithEpicResult
        }
      }
    }
  }
  ${ISSUE_WITH_EPIC_FRAGMENT}
`;


export const OPEN_ISSUES = gql`
  query GetOpenUserIssues($username: String!, $milestones: [String], $labels: [String], $fullPath: ID!) {
    project(fullPath: $fullPath) {
      name,
      issues (assigneeUsername: $username, 
              milestoneTitle: $milestones,
              labelName: $labels,
              state: opened, 
              sort: LABEL_PRIORITY_ASC ) {
        nodes {
          ...issueWithEpicResult
        }
      }
    }
  }
  ${ISSUE_WITH_EPIC_FRAGMENT}
`;

export const CLOSED_ISSUES = gql`
  query GetClosedUserIssues($username: String!, $milestones: [String], $labels: [String], $fullPath: ID!) {
    project(fullPath: $fullPath) {
      name,
      issues (assigneeUsername: $username, 
              milestoneTitle: $milestones,
              labelName: $labels,
              state: closed, 
              sort: updated_desc ) {
        nodes {
          ...issueWithEpicResult
        }
      }
    }
  }
  ${ISSUE_WITH_EPIC_FRAGMENT}
`;

export const OPEN_UNASSIGNED_ISSUES = gql`
  query GetOpenUserIssues($milestones: [String], $labels: [String], $fullPath: ID!) {
    project(fullPath: $fullPath) {
      name,
      issues (assigneeId: "None", 
              milestoneTitle: $milestones,
              labelName: $labels,
              state: opened, 
              sort: LABEL_PRIORITY_ASC ) {
        nodes {
          ...issueWithEpicResult
        }
      }
    }
  }
  ${ISSUE_WITH_EPIC_FRAGMENT}
`;

export const OPEN_UNASSIGNED_ISSUES_NO_MILESTONE = gql`
  query GetOpenUserIssuesNoMilestone($labels: [String], $fullPath: ID!) {
    project(fullPath: $fullPath) {
      name,
      issues (assigneeId: "None", 
              milestoneWildcardId: NONE,
              labelName: $labels,
              state: opened, 
              sort: LABEL_PRIORITY_ASC ) {
        nodes {
          ...issueWithEpicResult
        }
      }
    }
  }
  ${ISSUE_WITH_EPIC_FRAGMENT}
`;

export const OPEN_EPICS = gql`
  query GetEpics($labels: [String!], $groupPath: ID!) {
    group(fullPath: $groupPath) {
      name,
      epics (labelName: $labels, state: opened) {
        nodes {
          ...epicOnlyResult
        }
      }
    }
  }
  ${EPIC_ONLY_FRAGMENT}
`;

export const EPICS = gql`
  query GetEpics($labels: [String!], $groupPath: ID!) {
    group(fullPath: $groupPath) {
      name,
      epics (labelName: $labels) {
        nodes {
          ...epicOnlyResult
        }
      }
    }
  }
  ${EPIC_ONLY_FRAGMENT}
`;

export const MILESTONE_EPICS = gql`
  query GetMilestoneEpics($labels: [String!]  $milestone: String, $groupPath: ID!) {
    group(fullPath: $groupPath) {
      name,
      epics (labelName: $labels, milestoneTitle: $milestone) {
        nodes {
          ...epicOnlyResult
        }
      }
    }
  }
  ${EPIC_ONLY_FRAGMENT}
`;

export const EPICS_WITH_ISSUES = gql`
  query GetEpicsWithIssues($labels: [String!], $groupPath: ID!) {
    group(fullPath: $groupPath) {
      name,
      epics (labelName: $labels) {
        nodes {
          ...epicWithIssuesResult
        }
      }
    }
  }
  ${EPIC_WITH_ISSUES_FRAGMENT}
`;

export const USER = gql`
  query GetUser($username: String!) {
    user(username: $username) @rest(type: "User", path: "/users?{args}") {
      username,
      name, 
      id
    }
  }
`;

export const USERS = gql`
  query GetUsers {
    users {
      nodes {
        id,
        username,
        name
      }
    }
  }
`;

export const MILESTONES = gql`
  query GetMilestones($groupPath: ID!) {
    group(fullPath: $groupPath) {
      name,
      milestones {
        nodes {
          id,
          title,
          state,
          startDate,
          dueDate
        }
      }
    }
  }
`;

export const GROUP = gql`
  query GetGroup($groupPath: ID!) {
    group(fullPath: $groupPath) {
      name
    }
  }
`;


export const PROJECT = gql`
  query GetProject($fullPath: ID!) {
    project(fullPath: $fullPath) {
      name
    }
  }
`;

export const SET_ISSUE_EPIC = gql`
  mutation($projectPath: ID!, $iid: String!, $epicId: ID!) {
    issueSetEpic(input: { 
        projectPath: $projectPath,
        iid: $iid,
        epicId: $epicId
      }) {
      issue {
        ...issueWithEpicResult
      }
      errors
    }
  }
  ${ISSUE_WITH_EPIC_FRAGMENT}
`;

export const SET_ISSUE_ASSIGNEES = gql`
  mutation($projectPath: ID!, $iid: String!, $usernames: [String!]!) {
    issueSetAssignees(input: { 
        projectPath: $projectPath,
        iid: $iid,
        assigneeUsernames: $usernames
      }) {
      issue {
        ...issueWithEpicResult
      }
      errors
    }
  }
  ${ISSUE_WITH_EPIC_FRAGMENT}
`;

export const SET_ISSUE_MILESTONE = gql`
  mutation($projectPath: ID!, $iid: String!, $milestoneId: ID!) {
    updateIssue(input: { 
        projectPath: $projectPath,
        iid: $iid,
        milestoneId: $milestoneId
      }) {
      issue {
        ...issueWithEpicResult
      }
      errors
    }
  }
  ${ISSUE_WITH_EPIC_FRAGMENT}
`;

export const MERGE_REQUESTS = gql`
  query GetMergeRequests($fullPath: ID!) {
    project(fullPath: $fullPath) {
      name,
      mergeRequests(first: 100, state: opened, sort: CREATED_DESC) {
        nodes {
          id,
          iid,
          webUrl,
          createdAt,
          author {
            name,
            username
          },
          title,
          state,
          draft,
          approved,
          approvedBy {
            nodes {
              username
            }
          }
          diffStatsSummary {
            fileCount,
            additions,
            changes,
            deletions
          },
          discussions(first: 20) {
            nodes {
              notes(first: 20) {
                nodes {
                  author {
                    username
                  },
            			createdAt
                }
              }
            }
          },
          assignees(first: 5) {
            nodes {
              name,
              username
            }
          }
        }
      }
    }
  }
`