/**
 * Map with a LRU (Least recently used) policy.
 *
 * @link https://en.wikipedia.org/wiki/Cache_replacement_policies#LRU
 */
export class LruMap<value = unknown> extends Map<string, value> {
  maxSize: number;

  constructor(size: number) {
    super();
    this.maxSize = size;
  }

  override set(key: string, value: value) {
    super.set(key, value);
    if (this.maxSize && this.size > this.maxSize) {
      const keysNextValue = this.keys().next().value;
      if (keysNextValue) this.delete(keysNextValue);
    }
    return this;
  }
}
