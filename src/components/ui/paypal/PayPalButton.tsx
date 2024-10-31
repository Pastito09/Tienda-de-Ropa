'use client';

import {
  PayPalButtons,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';
import {
  CreateOrderActions,
  CreateOrderData,
  OnApproveActions,
  OnApproveData,
} from '@paypal/paypal-js';
import { setTransactionId } from '@/actions/payments/set-transaction-id';
import paypalCheckPayment from '@/actions/payments/paypal-check-payment';

interface Props {
  orderId: string;
  amount: number;
}

export const PayPalButton = ({ orderId, amount }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer();

  const roundedAmount = Math.round(amount * 100) / 100;

  if (isPending) {
    return (
      <div className='animate-pulse mb-16'>
        <div className='h-11 bg-gray-300 rounded' />
        <div className='h-11 bg-gray-300 rounded mt-3' />
      </div>
    );
  }

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ): Promise<string> => {
    const transactionId = await actions.order.create({
      intent: 'CAPTURE',
      purchase_units: [
        {
          invoice_id: orderId,
          amount: {
            value: `${roundedAmount}`,
            currency_code: 'USD',
          },
        },
      ],
    });
    //todo guardar el id en la base de datos
    const { ok, message } = await setTransactionId(
      orderId,
      transactionId
    );
    if (!ok) {
      throw new Error(message);
    }

    return transactionId;
  };

  const onApprove = async (
    data: OnApproveData,
    actions: OnApproveActions
  ) => {
    const details = await actions.order?.capture();
    if (!details) return;

    await paypalCheckPayment(details.id!);
  };

  return (
    <div className='relative z-0'>
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
      />
    </div>
  );
};
