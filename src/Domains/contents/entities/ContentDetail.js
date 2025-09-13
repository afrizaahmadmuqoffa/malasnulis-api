/* eslint-disable camelcase */
class ContentDetail {
  constructor(payload) {
    this._verifyPayload(payload);

    const { id, platform, type, tone, language, input_prompt, generated_content } = payload;

    this.id = id;
    this.platform = platform;
    this.type = type;
    this.tone = tone;
    this.language = language;
    this.input_prompt = input_prompt;
    this.generated_content = generated_content;
  }

  _verifyPayload({ id, platform, type, tone, language, input_prompt, generated_content }) {
    if (!id || !platform || !type || !tone || !language || !input_prompt || !generated_content) {
      throw new Error('DETAIL_CONTENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string' || typeof platform !== 'string' || !['caption', 'description', 'hashtags', 'full'].includes(type) || typeof tone !== 'string' || typeof language !== 'string' || typeof input_prompt !== 'string' || !Array.isArray(generated_content)) {
      throw new Error('DETAIL_CONTENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = ContentDetail;