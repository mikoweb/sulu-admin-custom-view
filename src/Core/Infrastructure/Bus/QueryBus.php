<?php

namespace App\Core\Infrastructure\Bus;

use App\Core\Infrastructure\Interaction\Query\QueryInterface;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Messenger\Stamp\HandledStamp;

readonly class QueryBus implements QueryBusInterface
{
    public function __construct(
        private MessageBusInterface $queryBus,
    ) {
    }

    public function dispatch(QueryInterface $query, ?StampCollection $stamps = null): mixed
    {
        $envelope = $this->queryBus->dispatch($query, is_null($stamps) ? [] : $stamps->toArray());

        return $envelope->last(HandledStamp::class)?->getResult();
    }
}
