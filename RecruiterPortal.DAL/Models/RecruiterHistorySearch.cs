using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RecruiterPortalDAL.Models
{
    public class RecruiterHistorySearch
    {
        public int take { get; set; }
        public int skip { get; set; }
        public DateTime? startTime { get; set; }
        public DateTime? endTime { get; set; }
    }
}
