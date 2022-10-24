using Bank.Domain;
using Bank.Domain.Business;
using System;

public class Program
{
    public static void Main()
    {
        CategoriesBusiness categoriesBusiness = new CategoriesBusiness();
        Trade trade = new Trade();

        try
        {
            Console.WriteLine("Reference date(mm/dd/yyyy): ");
            DateTime referenceDate = DateTime.Parse(Console.ReadLine());

            Console.WriteLine("Number(Integer) of trades in the portfolio: ");
            int amountTrades = int.Parse(Console.ReadLine());
            Console.WriteLine();

            for (int i = 1; i <= amountTrades; i++)
            {
                string[] listElements = new string[2];

                Console.WriteLine("For " + i + "-Trade enter the trade amount, client’s sector and the next pending payment(separated by a space): ");
                string consoleValue = Console.ReadLine();
                listElements = consoleValue.Split(" ");

                trade.AddTrade(Double.Parse(listElements[0]), listElements[1], DateTime.Parse(listElements[2]));
            }

            Console.WriteLine();
            categoriesBusiness.Rules(referenceDate, trade.Trades);
        }
        catch (FormatException e)
        {
            Console.WriteLine("Error in format: " + e.Message);
        }
        catch (Exception e)
        {
            Console.WriteLine("Unexpected error: " + e.Message);
        }
    }
}





