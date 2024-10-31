'use server';

import prisma from '@/lib/prisma';

export const setTransactionId = async (
  orderId: string,
  transactionId: string
) => {
  try {
    const transaction = await prisma.order.update({
      where: { id: orderId },
      data: { transactionId: transactionId },
    });

    if (!transaction) {
      return {
        ok: false,
        message: `No se encontró orden con el ${orderId}`,
      };
    }
    return {
      ok: true,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'No se pudo completar la transacción',
    };
  }
};

export default setTransactionId;
