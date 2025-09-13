/* eslint-disable camelcase */
class AddContent {
  constructor(payload) {
    this._verifyPayload(payload);

    const { user_id, platform, type, tone, language, input_prompt, variations } = payload;

    this.user_id = user_id;
    this.platform = platform;
    this.type = type;
    this.tone = tone;
    this.language = language;
    this.input_prompt = input_prompt;
    this.variations = variations || 1;
  }

  _verifyPayload({ user_id, platform, type, tone, language, input_prompt, variations }) {
    if (!user_id || !platform || !type || !tone || !language || !input_prompt) {
      throw new Error('ADD_CONTENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof user_id !== 'string' || typeof platform !== 'string' || !['caption', 'description', 'hashtags', 'full'].includes(type) || typeof tone !== 'string' || typeof language !== 'string' || typeof input_prompt !== 'string') {
      throw new Error('ADD_CONTENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    if (variations !== undefined) {
      if (isNaN(Number(variations)) || Number(variations) < 1) {
        throw new Error('ADD_CONTENT.INVALID_VARIATIONS');
      }
      if (Number(variations) > 3) {
        throw new Error('ADD_CONTENT.TOO_MANY_VARIATIONS');
      }
    }

  }
}

module.exports = AddContent;