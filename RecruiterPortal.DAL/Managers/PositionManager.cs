using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using RecruiterPortal.DAL.Models;
using RecruiterPortal.DAL.Repository;
using RecruiterPortal.DAL.SqlModels;
using System.Dynamic;

namespace RecruiterPortalDAL.Managers;

public class PositionManager
{
    public static IEnumerable<Position> GetPositions(string name)
    {
        string spName = "sp_GetPosition";
        try
        {
            GenericRepository<Position> positionRepo = new GenericRepository<Position>();
            dynamic expandoObject = new ExpandoObject();
            expandoObject.PositionName = name;
            SqlParameter[] sqlParameters = positionRepo.GetSqlParametersFromExpandoObject(expandoObject, spName);
            IEnumerable<Position> positionList = positionRepo.GetAll(spName, sqlParameters);

            return positionList;
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

    private static Position MapPositionCreateRequest(PositionRequestModel request, int recruiterId)
    {
        Position position = new Position();
        position.PositionName = request.PositionName;
        position.CreatedBy = recruiterId;
        position.CreatedDate = DateTime.Now;
        return position;
    }

    private static Position MapPositionUpdateRequest(PositionRequestModel request, Position position, int recruiterId)
    {
        position.Id = request.Id;
        position.PositionName = request.PositionName;
        position.UpdatedBy = recruiterId;
        position.UpdatedDate = DateTime.Now;
        return position;
    }

    private static PositionResponseModel MapPositionResponse(Position position)
    {
        PositionResponseModel response = new PositionResponseModel();
        response.Id = position.Id;
        response.PositionName = position.PositionName;
        response.CreatedBy = position.CreatedBy;
        response.CreatedDate = position.CreatedDate;
        response.UpdatedBy = position.UpdatedBy;
        response.UpdatedDate = position.UpdatedDate;
        return response;
    }

    private static List<PositionResponseModel> MapPositionResponse(IEnumerable<Position> positions)
    {
        List<PositionResponseModel> response = new List<PositionResponseModel>();
        foreach (var position in positions)
        {
            response.Add(MapPositionResponse(position));
        }

        return response;
    }

    public static async Task<PositionResponseModel> GetPositionById(int id)
    {
        GenericRepository<Position> repository = new GenericRepository<Position>();
        Position position = await repository.GetByIdAsync(m => m.Id == id);
        if (position == null) return null;
        PositionResponseModel response = MapPositionResponse(position);
        return response;
    }

    public static async Task<bool> IsExistPositionName(string name, int? id = null)
    {
        bool isExist = false;
        using UmrrecruitmentApplicantContext context = new UmrrecruitmentApplicantContext();

        if (id == null || id == 0)
        {
            isExist = await context.Positions.AnyAsync(p => p.PositionName.ToLower() == name.ToLower());
        }
        else
        {
            isExist = await context.Positions.AnyAsync(p => p.PositionName.ToLower() == name.ToLower() && p.Id != id);
        }

        return isExist;
    }

    public static async Task<PagedResponse<PositionResponseModel>> GetAllPosition(int page, int pageSize)
    {
        List<PositionResponseModel> positionsToReturn = null;
        int positionsCount = await new GenericRepository<Position>().GetAllAsyncCount();
        var positions = await new GenericRepository<Position>().GetPageAsync(page, pageSize);
        if (positions != null && positions.Count() > 0)
        {
            positionsToReturn = MapPositionResponse(positions.ToList());
        }

        return new PagedResponse<PositionResponseModel> { Records = positionsToReturn, TotalRecords = positionsCount };
    }

    public static async Task<int> Create(PositionRequestModel request, int recruiterId)
    {
        try
        {
            GenericRepository<Position> repository = new GenericRepository<Position>();
            Position positionToCreate = MapPositionCreateRequest(request, recruiterId);
            Position createdPosition = await repository.SaveAsync(positionToCreate);
            return createdPosition.Id;
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public static async Task<bool?> Update(PositionRequestModel request, int recruiterId)
    {
        try
        {
            GenericRepository<Position> repository = new GenericRepository<Position>();
            Position position = await repository.GetByIdAsync(m => m.Id == request.Id);
            if (position != null)
            {
                var positionToUpdate = MapPositionUpdateRequest(request, position, recruiterId);
                return await repository.UpdateAsync(positionToUpdate) > 0 ? true : false;
            }

            return null;
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public static async Task<int?> Delete(int id)
    {
        try
        {
            int? result = null;
            GenericRepository<Position> repository = new GenericRepository<Position>();
            Position position = await repository.GetByIdAsync(j => j.Id == id);

            if (position != null)
            {
                result = await repository.DeleteAsync(position);
            }

            return result;
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }
}
