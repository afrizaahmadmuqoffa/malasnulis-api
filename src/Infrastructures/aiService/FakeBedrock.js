/* eslint-disable camelcase */
// (FAKE IMPLEMENTATION)
class FakeBedrock {
  constructor({ region = 'us-east-1', modelId = 'anthropic.claude-v2:1' } = {}) {
    this.region = region;
    this.modelId = modelId;
    this.isFake = true;
  }

  async generate({ platform, type = 'full', tone, language, input_prompt, variations = 1 }) {

    const results = [];

    for (let i = 1; i <= variations; i++) {
      switch (type) {
      case 'caption':
        results.push({
          caption: `Caption ${i} untuk ${platform} (${tone || 'netral'}, ${language || 'id'}): ${input_prompt}`,
        });
        break;

      case 'hashtags':
        results.push({
          hashtags: [
            `#${platform.toLowerCase()}${i}`,
            '#fake',
            '#implement',
          ],
        });
        break;

      case 'description':
        results.push({
          description: `📝 Deskripsi ${i} (${tone || 'netral'}, ${language || 'id'}) untuk konten di ${platform}: ${input_prompt}`,
        });
        break;

      case 'full':
      default:
        results.push({
          caption: `🚀 Caption ${i} untuk ${platform}: ${input_prompt}`,
          description: `📌 Deskripsi ${i} tentang ${input_prompt} di ${platform}.`,
          hashtags: [
            `#fake${i}`,
            `#implement${i}`,
            `#awesome${i}`,
          ],
        });
        break;
      }
    }

    return results;
  }
}

module.exports = FakeBedrock;
