import type { SearchableItem } from "./searchable-item";

export class SearchRanker {
  private static readonly SCORE_TITLE_EXACT_MATCH = 200;
  private static readonly SCORE_TITLE_CONTAINS_QUERY = 100;
  private static readonly SCORE_TITLE_STARTS_WITH_QUERY = 50;
  private static readonly SCORE_TITLE_TERM_CONTAINS = 10;
  private static readonly SCORE_TITLE_TERM_STARTS_WITH = 5;
  private static readonly SCORE_TITLE_WORD_EXACT_MATCH = 7;
  private static readonly SCORE_TITLE_WORD_STARTS_WITH = 3;
  private static readonly SCORE_CONTENT_CONTAINS_QUERY = 30;
  private static readonly SCORE_CONTENT_TERM_MATCH = 5;

  static search<T extends SearchableItem>(items: T[], query: string): T[] {
    if (!query.trim()) {
      return items;
    }

    const searchQuery = query.trim().toLowerCase();
    const searchTerms = searchQuery.split(" ").filter((t) => t.length > 0);

    return items
      .map((item) => {
        const contentStr = item.notes ?? "";
        const tagsStr = item.tags?.join(" ") ?? "";
        const fullContent = `${contentStr} ${tagsStr}`.trim();

        const score = SearchRanker.calculateScore(
          item,
          searchQuery,
          searchTerms,
          fullContent,
        );
        return { item, score };
      })
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((entry) => entry.item);
  }

  private static calculateScore(
    item: SearchableItem,
    fullQuery: string,
    terms: string[],
    contentStr: string,
  ): number {
    const title = item.content.toLowerCase();
    const titleWords = title
      .split(/[ \-_.]+/)
      .filter((w: string) => w.length > 0);

    return (
      SearchRanker.scoreForFullQueryMatch(title, fullQuery) +
      SearchRanker.scoreForTermMatches(title, terms) +
      SearchRanker.scoreForWordMatches(titleWords, terms) +
      SearchRanker.scoreForContentMatches(contentStr, fullQuery, terms)
    );
  }

  private static scoreForFullQueryMatch(
    title: string,
    fullQuery: string,
  ): number {
    let score = 0;
    if (title.includes(fullQuery)) {
      score += SearchRanker.SCORE_TITLE_CONTAINS_QUERY;
    }
    if (title === fullQuery) {
      score += SearchRanker.SCORE_TITLE_EXACT_MATCH;
    }
    if (title.startsWith(fullQuery)) {
      score += SearchRanker.SCORE_TITLE_STARTS_WITH_QUERY;
    }
    return score;
  }

  private static scoreForTermMatches(title: string, terms: string[]): number {
    let score = 0;
    for (const term of terms) {
      if (title.includes(term)) {
        score += SearchRanker.SCORE_TITLE_TERM_CONTAINS;
      }
      if (title.startsWith(term)) {
        score += SearchRanker.SCORE_TITLE_TERM_STARTS_WITH;
      }
    }
    return score;
  }

  private static scoreForWordMatches(
    titleWords: string[],
    terms: string[],
  ): number {
    let score = 0;
    for (const term of terms) {
      for (const word of titleWords) {
        if (word.startsWith(term)) {
          score += SearchRanker.SCORE_TITLE_WORD_STARTS_WITH;
        }
        if (word === term) {
          score += SearchRanker.SCORE_TITLE_WORD_EXACT_MATCH;
        }
      }
    }
    return score;
  }

  private static scoreForContentMatches(
    content: string,
    fullQuery: string,
    terms: string[],
  ): number {
    if (!content.trim()) {
      return 0;
    }

    const contentLower = content.toLowerCase();
    let score = 0;

    if (contentLower.includes(fullQuery)) {
      score += SearchRanker.SCORE_CONTENT_CONTAINS_QUERY;
    }

    for (const term of terms) {
      if (contentLower.includes(term)) {
        score += SearchRanker.SCORE_CONTENT_TERM_MATCH;
      }
    }

    return score;
  }
}
