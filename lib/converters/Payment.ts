import { db } from "@/firebase";
import { Payment } from "@/types/Payment";
import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  collection,
} from "firebase/firestore";

const paymentConverter: FirestoreDataConverter<Payment> = {
  toFirestore: function (payment: Payment): DocumentData {
    return {
      ...payment,
    };
  },
  fromFirestore: function (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Payment {
    const data = snapshot.data(options);

    const pay: Payment = {
      id: snapshot.id,
      amount: data.amount,
      currency: data.currency,
      status: data.status,
      created: data.created,
      payment_method_options: data.payment_method_options,
      metadata: data.metadata,
      payment_method: data.payment_method,
      last_payment_error: data.last_payment_error,
      payment_method_types: data.payment_method_types,
      customer: data.customer,
      canceled_at: data.canceled_at,
      client_secret: data.client_secret,
      receipt_email: data.receipt_email,
      source: data.source,
      amount_details: data.amount_details,
      statement_descriptor_suffix: data.statement_descriptor_suffix,
      description: data.description,
      transfer_data: data.transfer_data,
      processing: data.processing,
      confirmation_method: data.confirmation_method,
      transfer_group: data.transfer_group,
      amount_capturable: data.amount_capturable,
      livemode: data.livemode,
      review: data.review,
      application: data.application,
      application_fee_amount: data.application_fee_amount,
      capture_method: data.capture_method,
      invoice: data.invoice,
      payment_method_configuration_details:
        data.payment_method_configuration_details,
      latest_charge: data.latest_charge,
      items: data.items,
      cancellation_reason: data.cancellation_reason,
      prices: data.prices,
      on_behalf_of: data.on_behalf_of,
      automatic_payment_methods: data.automatic_payment_methods,
      amount_received: data.amount_received,
      object: data.object,
      next_action: data.next_action,
      setup_future_usage: data.setup_future_usage,
      statement_descriptor: data.statement_descriptor,
      shipping: data.shipping,
      processed: data.processed || false,
      // add other fields as necessary
    };

    return pay;
  },
};

export const paymentRef = (userId: string) =>
  collection(db, "customers", userId, "payments").withConverter(
    paymentConverter
  );
