interface Feature {
    dtype: string;
    _type: string;
}

interface Version {
    version_str: string;
    major: number;
    minor: number;
    patch: number;
}

interface Split {
    name: string;
    num_bytes: number;
    num_examples: number;
    dataset_name: string;
}

interface DownloadChecksums {
    [key: string]: {
        num_bytes: number;
        checksum: string | null;
    };
}

export interface IDatasetInfo {
    description: string;
    citation: string;
    homepage: string;
    license: string;
    features: {
        [key: string]: Feature;
    };
    builder_name: string;
    dataset_name: string;
    config_name: string;
    version: Version;
    splits: {
        [key: string]: Split;
    };
    download_checksums: DownloadChecksums;
    download_size: number;
    dataset_size: number;
    size_in_bytes: number;
}
