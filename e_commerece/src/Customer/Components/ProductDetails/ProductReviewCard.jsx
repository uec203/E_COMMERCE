import { Avatar, Rating } from '@mui/material';
import { purple } from '@mui/material/colors';

const ProductReviewCard = ({ rating }) => {
  return (
    <div className="border rounded-lg p-4">
      {/* Tailwind Grid */}
      <div className="grid grid-cols-12 gap-4">

        {/* Avatar */}
        <div className="col-span-2 sm:col-span-1 flex justify-center">
          <Avatar
            sx={{ width: 56, height: 56, bgcolor: purple[500] }}
            className="text-white"
          >
            R
          </Avatar>
        </div>

        {/* Review Content */}
        <div className="col-span-10 sm:col-span-11 space-y-2">
          <div>
            <p className="font-semibold text-lg">Ram</p>
            <p className="text-sm opacity-70">April 5, 2025</p>
          </div>

          <Rating
            value={4.5}
            name="half-rating"
            readOnly
            precision={0.5}
          />

          <p className="text-gray-700">
            Nice product, I really like this shirt.
          </p>
        </div>

      </div>
    </div>
  );
};

export default ProductReviewCard;
