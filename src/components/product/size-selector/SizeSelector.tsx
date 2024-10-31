import type { Size } from "@/interfaces";
import clsx from "clsx";

interface Props {
    selectedSize?: Size
    avaliableSizes: Size[]

    onSizeChanged: (size: Size) => void
}


export const SizeSelector = ({ selectedSize, avaliableSizes, onSizeChanged }: Props) => {
  
  
    return (
        <div className="my-5">
            <h3 className="font-bold mb-4">Tallas disponibles</h3>

            <div className="flex">
                {
                    avaliableSizes.map((size) => (
                        <button 
                            key={size}
                            onClick={() => onSizeChanged(size)}
                            className={
                                clsx(
                                    "mx-2 hover:underline text-lg",
                                    {
                                        'underline': size === selectedSize
                                    }
                                )
                            }
                        >
                            {size}
                        </button>
                    ))
                }
            </div>

        </div>
    )
};

export default SizeSelector;
