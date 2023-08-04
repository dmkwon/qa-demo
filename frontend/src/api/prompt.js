import useSWR from 'swr';
import { useMemo } from 'react';
// utils
import { fetcher, endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

export function useGetPrompts() {
  // const URL = endpoints.prompt.list;
  const URL = endpoints.post.list;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  if (data !== undefined) {
    data.prompts = [];
    data.posts.map((post) =>
      data.prompts.push({
        author: post.author,
        comments: post.comments,
        content: post.content,
        coverUrl: post.coverUrl,
        createdAt: post.createdAt,
        description: post.description,
        favoritePerson: post.favoritePerson,
        id: post.id,
        metaDescription: post.metaDescription,
        metaKeywords: post.metaDescription,
        metaTitle: post.metaTitle,
        publish: post.publish,
        public: post.publish === 'draft',
        tags: post.tags,
        title: post.title,
        totalComments: post.totalComments,
        totalFavorites: post.totalFavorites,
        totalShares: post.totalShares,
        totalViews: post.totalViews,
      })
    );
  }

  const memoizedValue = useMemo(
    () => ({
      prompts: data?.prompts || [],
      promptsLoading: isLoading,
      promptsError: error,
      promptsValidating: isValidating,
      promptsEmpty: !isLoading && !data?.prompts.length,
    }),
    [data?.prompts, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetPrompt(title) {
  const URL = title ? [endpoints.post.details, { params: { title } }] : null;
  // const URL = title ? [endpoints.prompt.details, { params: { title } }] : null;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  if (data !== undefined) {
    data.prompt = data.post;
  }

  const memoizedValue = useMemo(
    () => ({
      prompt: data?.prompt,
      promptLoading: isLoading,
      promptError: error,
      promptValidating: isValidating,
    }),
    [data?.prompt, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetLatestPrompts(title) {
  const URL = title ? [endpoints.post.latest, { params: { title } }] : null;

  // const URL = title ? [endpoints.prompt.latest, { params: { title } }] : null;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  if (data !== undefined) {
    data.latestPrompts = [];
    data.latestPosts.map((post) =>
      data.latestPrompts.push({
        author: post.author,
        comments: post.comments,
        content: post.content,
        coverUrl: post.coverUrl,
        createdAt: post.createdAt,
        description: post.description,
        favoritePerson: post.favoritePerson,
        id: post.id,
        metaDescription: post.metaDescription,
        metaKeywords: post.metaDescription,
        metaTitle: post.metaTitle,
        publish: post.publish,
        public: post.publish === 'draft',
        tags: post.tags,
        title: post.title,
        totalComments: post.totalComments,
        totalFavorites: post.totalFavorites,
        totalShares: post.totalShares,
        totalViews: post.totalViews,
      })
    );
  }

  const memoizedValue = useMemo(
    () => ({
      latestPrompts: data?.latestPrompts || [],
      latestPromptsLoading: isLoading,
      latestPromptsError: error,
      latestPromptsValidating: isValidating,
      latestPromptsEmpty: !isLoading && !data?.latestPrompts.length,
    }),
    [data?.latestPrompts, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useSearchPrompts(query) {
  const URL = query ? [endpoints.prompt.search, { params: { query } }] : null;

  // const URL = query ? [endpoints.prompt.search, { params: { query } }] : null;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, {
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.results || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !data?.results.length,
    }),
    [data?.results, error, isLoading, isValidating]
  );

  return memoizedValue;
}
