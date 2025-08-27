export const path = {
  home() {
    return `/`;
  },
  topicPage(slug: string) {
    return `/topic/${slug}`;
  },
  topicSlug(slug: string, id: string) {
    return `/topic/${slug}/${id}`;
  },
  showTopicPage(slug: string) {
    return `/topic/${slug}`;
  },
};
