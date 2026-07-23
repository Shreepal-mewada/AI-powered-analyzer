export const runRetryManager = async (state) => {
  const currentRetries = state.retryCount || 0;
  console.log(`🔄 Retry Manager triggered (Attempt ${currentRetries + 1} of ${state.maxRetries}). Feedback: "${state.reviewFeedback}"`);

  return {
    retryCount: currentRetries + 1,
    status: 'RETRYING',
    activeNode: 'RetryManager'
  };
};
