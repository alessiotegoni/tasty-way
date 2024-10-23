import { Button } from "@/components/ui/button";
import { Form, FormField, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useUpdateUserSecurity } from "@/lib/react-query/mutations/userMutations";
import {
  userSecuritySchema,
  UserSecurityType,
} from "@/lib/validations/userProfileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

const RestaurantSecurity = () => {
  const { mutateAsync: updateUserSecurity, isPending } =
    useUpdateUserSecurity();

  const form = useForm<UserSecurityType>({
    resolver: zodResolver(userSecuritySchema),
    mode: "onSubmit",
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  const onSubmit: SubmitHandler<UserSecurityType> = async (data) => {
    if (isPending) return;

    try {
      const res = await updateUserSecurity(data);

      toast({ description: res.message });

      form.reset();
    } catch (err: any) {
      toast({
        description:
          err?.response?.data.message ??
          "Errore nell'aggiornamento della password",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="restaurant-security__body max-w-[450px]">
      <h2 className="text-2xl font-semibold">Cambia password</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="oldPassword"
            control={form.control}
            render={({ field }) => (
              <div>
                <Label htmlFor="oldPassword">Vecchia password</Label>
                <Input id="oldPassword" {...field} />
              </div>
            )}
          />
          <FormMessage className="mt-4 mb-2">
            {form.formState.errors.oldPassword?.message}
          </FormMessage>
          <FormField
            name="newPassword"
            control={form.control}
            render={({ field }) => (
              <div>
                <Label htmlFor="newPassword">Nuova password</Label>
                <Input id="newPassword" {...field} />
              </div>
            )}
          />
          <FormMessage className="mt-4 mb-2">
            {form.formState.errors.newPassword?.message}
          </FormMessage>
          {form.formState.isDirty && (
            <div className="flex justify-end items-center gap-2 mt-7">
              <Button
                type="button"
                onClick={() => form.reset()}
                className="btn py-3 px-5 font-medium text-sm rounded-xl bg-red-700
            text-red-100 border-red-800"
              >
                Annulla modifiche
              </Button>
              <Button
                type="submit"
                className="btn py-3 px-5 font-medium text-sm rounded-xl bg-green-700
            text-green-100 border-green-800"
              >
                Salva modifiche
              </Button>
            </div>
          )}
        </form>
      </Form>
      {/* {isError && (
        <div
          className="p-4 mt-5 font-semibold text-xl rounded-xl bg-red-700
            text-red-100 border-red-800"
        >
          {error.response?.data.message}
        </div>
      )} */}
    </div>
  );
};
export default RestaurantSecurity;
