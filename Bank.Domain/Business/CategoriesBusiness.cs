using Bank.Domain.Enums;
using Bank.Domain.Interfaces;
using System;
using System.Collections.Generic;

namespace Bank.Domain.Business
{
    public class CategoriesBusiness
    {
        public void Rules(DateTime referenceDate, List<ITrade> trades)
        {
            foreach (var trade in trades)
            {
                var diffOfDates = referenceDate - trade.NextPaymentDate;

                if (diffOfDates.Days > 30)
                {
                    Console.WriteLine(CategoriesEnum.EXPIRED.ToString());
                }

                if (trade.Value > 1000000 && trade.ClientSector.ToLower().Equals("private"))
                {
                    Console.WriteLine(CategoriesEnum.HIGHRISK.ToString());
                }

                if (trade.Value > 1000000 && trade.ClientSector.ToLower().Equals("public"))
                {
                    Console.WriteLine(CategoriesEnum.MEDIUMRISK.ToString());
                }
            }
        }
    }
}
