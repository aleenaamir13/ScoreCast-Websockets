import {Router} from "express";
import { $constructor } from "zod/v4/core";

export const MatchRouter = Router();

const MAX_LIMIT = 100;

MatchRouter.get('/', async (req, res) => {
  const parsed = listMatchesQuerySchema.safeParse(req.query);
  if (!parsed.success) {
    return res.status(400).json({error: 'invalid query.', details: JSON.stringify(parsed.error)});
  }
  const limit= parsed.data.limit ?? MAX_LIMIT;
  try{
    const data=await db.select().from(matches).orderBy(desc(matches.createdAt)).limit(limit);
    res.json({data});
  }catch(e){
    res.status(500).json({error: 'Failed to list matches.', details: JSON.stringify(e)});
  }
});

MatchRouter.post('/',  async (req, res) => {
    const parsed=createMatchSchema.safeParse(req.body);
    const {data:{startTime,endTime,homeScore,awayScore}}=parsed
    if(!parsed.success){
        return res.status(400).json({error: 'invalid payload.', details: JSON.stringify(parsed.error)});
    }
    try{
        const event=await db.insert(matches).values({
            ...parsed.data,
            startTime: new Date(startTime),
            endTime: new Date(endTime),
            homeScore: homeScore ?? 0,
            awayScore: awayScore ?? 0,
            status: getMatchStatus(startTime, endTime),
            createdAt: new Date(),
        }).returning();
        res.status(201).json({data: event});
    } catch(e){
        res.status(500).json({error: 'internal server error.', details: JSON.stringify(parsed.error)});
    }
});