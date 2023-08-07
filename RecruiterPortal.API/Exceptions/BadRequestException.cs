﻿namespace RecruiterPortal.API.Exceptions
{
    public class BadRequestException : Exception
    {
        public BadRequestException(string name, object key) : base($"{name} ({key}) was not found")
        {

        }
    }
}
