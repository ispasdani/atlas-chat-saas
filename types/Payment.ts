interface PaymentMethodOptions {
  card: {
    request_three_d_secure: string;
    mandate_options: null;
    installments: null;
    network: null;
  };
}

interface AmountDetails {
  tip: Record<string, unknown>;
}

interface Price {
  metadata: Record<string, unknown>;
  active: boolean;
  currency: string;
  livemode: boolean;
  transform_quantity: null;
  created: number;
  nickname: null;
  billing_scheme: string;
  lookup_key: null;
  tax_behavior: string;
  type: string;
  recurring: null;
  tiers_mode: null;
  unit_amount: number;
  custom_unit_amount: null;
  product: string;
  id: string;
  object: string;
  unit_amount_decimal: string;
}

interface Item {
  amount_subtotal: number;
  object: string;
  quantity: number;
  id: string;
  description: string;
  amount_total: number;
  currency: string;
  amount_tax: number;
  amount_discount: number;
  price: Price;
}

interface FirestoreKey {
  path: {
    segments: string[];
    offset: number;
    len: number;
  };
}

interface Firestore {
  app: {
    _isDeleted: boolean;
    _options: {
      apiKey: string;
      authDomain: string;
      projectId: string;
      storageBucket: string;
      messagingSenderId: string;
      appId: string;
    };
    _config: {
      name: string;
      automaticDataCollectionEnabled: boolean;
    };
    _name: string;
    _automaticDataCollectionEnabled: boolean;
    _container: {
      name: string;
      providers: Record<string, unknown>;
    };
  };
  databaseId: {
    projectId: string;
    database: string;
  };
  settings: {
    host: string;
    ssl: boolean;
    ignoreUndefinedProperties: boolean;
    cacheSizeBytes: number;
    experimentalForceLongPolling: boolean;
    experimentalAutoDetectLongPolling: boolean;
    experimentalLongPollingOptions: Record<string, unknown>;
    useFetchStreams: boolean;
  };
}

interface PriceInfo {
  converter: null;
  _key: FirestoreKey;
  type: string;
  firestore: Firestore;
}

export interface Payment {
  payment_method_options: PaymentMethodOptions;
  metadata: Record<string, unknown>;
  payment_method: string;
  last_payment_error: null;
  payment_method_types: string[];
  customer: string;
  canceled_at: null;
  client_secret: string;
  receipt_email: null;
  source: null;
  amount_details: AmountDetails;
  statement_descriptor_suffix: null;
  id: string;
  description: null;
  transfer_data: null;
  processing: null;
  confirmation_method: string;
  transfer_group: null;
  amount_capturable: number;
  livemode: boolean;
  review: null;
  application: null;
  status: string;
  amount: number;
  application_fee_amount: null;
  capture_method: string;
  invoice: null;
  payment_method_configuration_details: null;
  latest_charge: string;
  items: Item[];
  cancellation_reason: null;
  prices: PriceInfo[];
  created: number;
  on_behalf_of: null;
  automatic_payment_methods: null;
  amount_received: number;
  object: string;
  next_action: null;
  setup_future_usage: null;
  statement_descriptor: null;
  shipping: null;
  currency: string;
  processed: boolean;
}
