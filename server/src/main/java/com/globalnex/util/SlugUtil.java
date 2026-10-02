package com.globalnex.util;

import java.text.Normalizer;
import java.util.Locale;
import java.util.regex.Pattern;

public class SlugUtil {

    private static final Pattern NON_LATIN = Pattern.compile("[^\\w-]");
    private static final Pattern WHITESPACE = Pattern.compile("[\\s]");
    private static final Pattern DUPLICATE_HYPHENS = Pattern.compile("-{2,}");

    public static String toSlug(String input) {
        if (input == null || input.isBlank()) {
            return "item-" + System.currentTimeMillis();
        }

        String noWhitespace = WHITESPACE.matcher(input.trim()).replaceAll("-");
        String normalized = Normalizer.normalize(noWhitespace, Normalizer.Form.NFD);
        String slug = NON_LATIN.matcher(normalized).replaceAll("");
        slug = DUPLICATE_HYPHENS.matcher(slug).replaceAll("-");

        slug = slug.toLowerCase(Locale.ENGLISH);
        if (slug.startsWith("-")) {
            slug = slug.substring(1);
        }
        if (slug.endsWith("-")) {
            slug = slug.substring(0, slug.length() - 1);
        }

        return slug.isEmpty() ? "item-" + System.currentTimeMillis() : slug;
    }
}
