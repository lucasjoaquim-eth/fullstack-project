using Bank.Domain.Interfaces;
using System;
using System.Collections.Generic;

namespace Bank.Domain
{
    public class Trade : ITrade
    {
        public DateTime NextPaymentDate { get; private set; }
        public double Value { get; private set; }
        public string ClientSector { get; private set; }
        public List<ITrade> Trades { get; private set; } = new List<ITrade>();

        public Trade()
        {
        }

        public Trade(double value, string clientSector, DateTime nextPaymentDate)
        {
            NextPaymentDate = nextPaymentDate;
            Value = value;
            ClientSector = clientSector;
        }

        public void AddTrade(double value, string clientSector, DateTime nextPaymentDate)
        {
            var trade = new Trade(value, clientSector, nextPaymentDate);
            Trades.Add(trade);
        }
    }

}
