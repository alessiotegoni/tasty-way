import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPrivate from "@/hooks/usePrivateApi";
import { ApiError, CheckoutSessionBody } from "@/types/apiTypes";
import {
  createCheckoutSessionUrl,
  updateUserProfile,
  updateUserSecurity,
} from "@/lib/api/userApi";
import { UserProfileType } from "@/lib/validations/userProfileSchema";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/contexts/AuthContext";

export const useCreateCheckoutSession = () => {
  const privateApi = useAxiosPrivate();
  const { handleSetCart } = useCart();

  return useMutation<string, ApiError, CheckoutSessionBody>({
    mutationKey: ["checkoutSessionUrl"],
    mutationFn: (data) => createCheckoutSessionUrl(data, privateApi),
    onSuccess: (_, { restaurantId }) =>
      handleSetCart({ restaurantId, type: "REMOVE" }),
  });
};

export const useUpdateUserProfile = () => {
  const privateApi = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation<{ message: string }, ApiError, UserProfileType>({
    mutationKey: ["updateUserProfile"],
    mutationFn: (data) => updateUserProfile(privateApi, data),
    onSuccess: (_, variables) =>
      queryClient.setQueryData(["userProfile"], () => variables),
  });
};

export const useUpdateUserSecurity = () => {
  const privateApi = useAxiosPrivate();
  const { refreshToken } = useAuth();

  return useMutation<
    { message: string },
    ApiError,
    { newPassword: string; oldPassword: string }
  >({
    mutationKey: ["updateUserSecurity"],
    mutationFn: (data) => updateUserSecurity(privateApi, data),
    onSuccess: () => refreshToken(),
  });
};
