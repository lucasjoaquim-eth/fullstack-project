using System;
using System.Collections.Generic;

namespace Bank.Domain.Interfaces
{
    public interface ITrade
    {
        DateTime NextPaymentDate { get;  }
        double Value { get;  }
        string ClientSector { get;  }
        List<ITrade> Trades { get;  }
    }
}
