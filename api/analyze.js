const cheerio = require('cheerio');
const axios = require('axios');

module.exports = async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ success: false, error: 'URL is required' });
  }

  const fullUrl = url.startsWith('http') ? url : `http://${url}`;
  
  try {
    const urlHostname = new URL(fullUrl).hostname;

    const { data } = await axios.get(fullUrl, {
      timeout: 10000, // 10 second timeout is plenty now
      headers: { 'User-Agent': 'DevSEOTools/1.0' }
    });

    const $ = cheerio.load(data);

    // --- All other extractions are fast and reliable ---
    const title = $('title').text().trim();
    const description = $('meta[name="description"]').attr('content') || '';
    const h1s = [];
    $('h1').each((i, el) => { h1s.push($(el).text().trim()); });
    const h2s = [];
    $('h2').each((i, el) => { h2s.push($(el).text().trim()); });
    const bodyText = $('body').text().replace(/\s+/g, ' ').trim();
    const wordCount = bodyText.split(' ').length;
    let internalLinks = 0, externalLinks = 0;
    $('a[href]').each((i, el) => {
      const link = $(el).attr('href');
      if (link && link.startsWith('http')) {
        try {
          if (new URL(link).hostname.includes(urlHostname)) { internalLinks++; } else { externalLinks++; }
        } catch (e) { externalLinks++; }
      } else if (link && link.startsWith('/')) { internalLinks++; }
    });
    const canonical = $('link[rel="canonical"]').attr('href') || 'Missing';
    const metaRobots = $('meta[name="robots"]').attr('content') || 'Not Set';
    const openGraph = { title: $('meta[property="og:title"]').attr('content') || title, description: $('meta[property="og:description"]').attr('content') || description, image: $('meta[property="og:image"]').attr('content') || '', url: $('meta[property="og:url"]').attr('content') || '' };
    const twitter = { card: $('meta[name="twitter:card"]').attr('content') || '', title: $('meta[name="twitter:title"]').attr('content') || openGraph.title, description: $('meta[name="twitter:description"]').attr('content') || openGraph.description, image: $('meta[name="twitter:image"]').attr('content') || openGraph.image };
    const images = [];
    $('img').each((i, el) => { images.push({ src: $(el).attr('src') || 'No src', alt: $(el).attr('alt') || 'Missing' }); });
    const imagesMissingAlt = images.filter(img => img.alt === 'Missing');
    const schemas = [];
    $('script[type="application/ld+json"]').each((i, el) => {
        try { schemas.push(JSON.parse($(el).html())['@type'] || 'Type not specified'); } catch (e) { /* ignore */ }
    });

    // Send the final JSON response
    res.status(200).json({
      success: true,
      seo: {
        title: { value: title, length: title.length },
        description: { value: description, length: description.length },
        headings: { h1s, h2s },
        wordCount: wordCount,
        links: { internal: internalLinks, external: externalLinks },
        images: { total: images.length, missingAltCount: imagesMissingAlt.length, missingAltImages: imagesMissingAlt.slice(0, 5) },
        technical: { canonical, metaRobots },
        social: { openGraph, twitter },
        schemas: schemas
        // The "techStack" feature has been removed
      }
    });

  } catch (error) {
    // This catch block will now work as intended for axios errors or URL errors
    let errorMessage = error.message;
    if (error.response) { errorMessage = `Server responded with status: ${error.response.status}`; } 
    else if (error.request) { errorMessage = 'No response received from the server. Check the URL or network.'; }
    res.status(500).json({ success: false, error: errorMessage });
  }
};