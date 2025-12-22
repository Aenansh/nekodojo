export function buildCommentTree(flatComments: any[]): CommentProps[] {
  const commentMap: Record<string, any> = {};
  const rootComments: any[] = [];

  // Step 1: Initialize the map
  // Create a shallow copy of each comment and add an empty 'replies' array
  flatComments.forEach((comment) => {
    commentMap[comment.id] = { ...comment, replies: [] };
  });

  // Step 2: Link children to parents
  flatComments.forEach((comment) => {
    // strict check for parentId (must be string and not empty)
    if (comment.parentId) {
      // Look up the PARENT in our map
      const parent = commentMap[comment.parentId];
      
      // If parent exists, push the CURRENT comment (from the map) into parent's replies
      if (parent) {
        parent.replies.push(commentMap[comment.id]);
      }
    } else {
      // If no parentId, it is a Root Level Comment
      rootComments.push(commentMap[comment.id]);
    }
  });

  // Step 3: Optional Sorting (e.g., Newest replies at the top)
  // This recursively sorts the replies for every comment in the tree
  const sortReplies = (comments: any[]) => {
    comments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    comments.forEach((c) => {
      if (c.replies.length > 0) sortReplies(c.replies);
    });
  };
  
  // Sort the roots (and recursively the children)
  // You might want to skip this if your DB query already handled sorting well
  // sortReplies(rootComments);

  return rootComments;
}