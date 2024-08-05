const envCheck = process.env.NEXT_PUBLIC_STAGING ?
    'staging' : (process.env.NODE_ENV == 'development') ?
        'development' : 'production';