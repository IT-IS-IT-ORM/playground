export interface localStorageProperties {
  // 读
  get<T>(
    key: string,
    // 默认值
    defaultValue: T,
    // 反序列化方法
    deserializer?: (value: string) => T
  ): T;
  // 写
  set<T>(
    key: string,
    // 储存值
    value: T,
    // 序列化方法
    serializer?: (value: T) => string
  ): void;

  // 数据前缀, 用于和其他数据做区分 (建议: 项目名)
  _DATA_PREFIX: string;
  // 版本号
  _DATA_VERSION: string;
  // 版本号标记 字符串
  _VERSION_MARK_STRING: string;
  // 检测版本号
  _checkDataVersion: (data: string) => boolean;
}

export const localStorage: localStorageProperties = {
  get(key, defaultValue, deserializer?) {
    let data = window.localStorage.getItem(key);

    // key 存在
    if (data) {
      // 检测版本号
      if (this._checkDataVersion(data)) {
        // 移除版本号信息
        data = data.replace(this._VERSION_MARK_STRING, "");

        let deserializedData;
        // 执行反序列化
        try {
          deserializedData = deserializer?.(data) ?? JSON.parse(data);
        } catch (error) {
          console.error(`localStorage.get 反序列化异常: \n${error}`);
          deserializedData = defaultValue;
        }

        return deserializedData;
      }
      console.warn("本地数据版本不一致");
    }

    return defaultValue;
  },

  set(key, value, serializer?) {
    // 执行序列化
    let serializedValue = serializer?.(value) ?? JSON.stringify(value);
    // 记录版本号
    let serializedData = `${this._DATA_PREFIX}=${this._DATA_VERSION};${serializedValue}`;

    window.localStorage.setItem(key, serializedData);
  },

  _DATA_PREFIX: "Playground",
  _DATA_VERSION: "1.1.0",

  get _VERSION_MARK_STRING() {
    return `${this._DATA_PREFIX}=${this._DATA_VERSION};`;
  },

  _checkDataVersion(data) {
    return data.startsWith(this._VERSION_MARK_STRING);
  },
};
